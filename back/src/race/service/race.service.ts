import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Race, RaceState } from '../model/race.model';
import { RobotService } from './robot.service';
import { BehaviorSubject, filter, interval, Subject, takeUntil, tap } from 'rxjs';
import { RunningPace, speedPaceRate, staminaPaceConsumption, StatType } from '../model/robot.model';

@Injectable()
export class RaceService implements OnApplicationShutdown {
  private activeRace: Race = null;

  private raceEvents$ = new BehaviorSubject<Race | null>(null);

  private shutdownServerEvent$ = new Subject();

  constructor(private readonly robotService: RobotService) {
    this.startRaceLoop();
  }

  onApplicationShutdown(signal?: string): void {
    this.shutdownServerEvent$.next(true);
  }

  create(startTime: string) {
    this.activeRace = new Race(new Date(startTime));
    this.activeRace.registerRobots(this.robotService.findAll());
    this.raceEvents$.next(this.activeRace);
    return this.activeRace;
  }

  getRaceEvents$() {
    return this.raceEvents$.asObservable();
  }

  private startRaceLoop() {
    interval(1000).pipe(
      takeUntil(this.shutdownServerEvent$),
      filter(() => this.activeRace !== null),
      tap(() => this.updateRace(this.activeRace))
    ).subscribe();
  }

  private updateRace(race: Race) {

    if (race.state === RaceState.BetsOpened && new Date().getTime() > race.endBetTime.getTime()) {
      race.state = RaceState.BetsClosed;
      this.raceEvents$.next(race)
    } else if (race.state === RaceState.BetsClosed && new Date().getTime() > race.startTime.getTime()) {
      race.state = RaceState.Started;
      this.raceEvents$.next(this.computeBotsPositions(race))
    } else if (race.state === RaceState.Started || race.state === RaceState.InProgress) {
      race.state = RaceState.InProgress;
      this.raceEvents$.next(this.computeBotsPositions(race))
    }
  }

  private computeBotsPositions(race: Race): Race {

    race.robots = race.robots.map(robot => {
      const robotStamina = robot.stats.find(s => s.type === StatType.Stamina).value;

      robot.state.pace = this.computeNextBehavior(
        robot.state.pace,
        robot.state.energy,
        robotStamina,
        robot.stats.find(s => s.type === StatType.Intelligence).value
      );

      const speed = Math.floor(
        speedPaceRate[robot.state.pace] * robot.stats.find(s => s.type === StatType.Speed).value
      );

      robot.state.energy = this.computeRemainingEnergy(
        robot.state.pace,
        robot.state.energy,
        robotStamina,
        speed
      );

      robot.state.distanceTraveled = robot.state.distanceTraveled + speed;

      return robot;
    });
    if (race.robots.findIndex(r => r.state.distanceTraveled < race.raceLength) === -1) {
      race.state = RaceState.Finished;
    }
    return race;
  }

  private computeRemainingEnergy(state: RunningPace, energy: number, stamina: number, speed: number): number {
    const restEnergyGain = 5;
    let remainingEnergy = 0;
    if (state === RunningPace.Rest || state === RunningPace.Exhausted) {
      remainingEnergy = energy + restEnergyGain >= stamina
        ? stamina
        : energy + restEnergyGain;
    } else {
      remainingEnergy = energy - staminaPaceConsumption[state] <= 0
        ? 0
        : energy - staminaPaceConsumption[state];
    }
    return remainingEnergy;
  }

  private computeNextBehavior(pace: RunningPace, energy: number, stamina: number, intelligence): RunningPace {
    const energyRate = energy / stamina;
    const intelligenceRate = intelligence / 100;
    let newPace = pace
    if (energy === 0) {
      newPace = RunningPace.Exhausted;
    } else if (pace === RunningPace.Exhausted && energy >= stamina) {
      newPace = RunningPace.Rest;
    } else if (pace === RunningPace.Rest && Math.random() < (energyRate * intelligenceRate)) {
      newPace = RunningPace.Sprint;
    } else if (pace === RunningPace.Sprint && Math.random() > ((1 - energyRate) * intelligenceRate)) {
      newPace = RunningPace.Rest;
    }
    return newPace;
  }
}
