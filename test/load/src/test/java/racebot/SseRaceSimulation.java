package racebot;

import com.redis.R;
import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class SseRaceSimulation extends Simulation {

  HttpProtocolBuilder httpProtocol = http.baseUrl("http://localhost:4200");

  SseMessageCheck sseCheckRaceState = sse.checkMessage("checkRaceState")
    .check(regex("state"));

  ScenarioBuilder scn = scenario("ServerSentEvents")
    .exec(sse("Connect").get("/api/race")
      .await(1).on(
        sse.checkMessage("checkLastRaceState").check(substring("state")))
    )
    .repeat(10).on(
      exec(sse("SetCheck").setCheck()
        .await(5).on(sseCheckRaceState))
    )
    .exec(sse("Close").close());
  {
    setUp(scn.injectOpen(rampUsers(200).during(1)).protocols(httpProtocol));
  }
}
