import React from "react";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      countdown: false,
      stopwatch: false,
    };
  }

  handleCross = (timer) => {
    this.setState({
      [timer]: false,
    });
  };

  handleStopWatch = () => {
    this.setState({
      stopwatch: true,
      countdown: false,
    });
  };
  handleCountDown = () => {
    this.setState({
      countdown: true,
      stopwatch: false,
    });
  };
  render() {
    return (
      <>
        <div className="container">
          <h1>🚀 Timers 🚀</h1>
          <div className="btn-wraper">
            {this.state.stopwatch ? (
              <Stopwatch handleCross={this.handleCross} />
            ) : (
              <button onClick={this.handleStopWatch}>Show Stopwatch</button>
            )}
            {this.state.countdown ? (
              <Countdown handleCross={this.handleCross} />
            ) : (
              <button onClick={this.handleCountDown}>Show Countdown</button>
            )}
          </div>
        </div>
      </>
    );
  }
}

class Countdown extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hours: 0,
      mins: 0,
      secs: 0,
      timer: false,
    };
  }

  handleTimerStart = () => {
    this.setState({
      timer: true,
    });
  };

  handleIncTime = (time) => {
    this.setState({
      [time]: this.state[time] + 1,
    });
  };

  handleDecTime = (time) => {
    this.setState({
      [time]: this.state[time] - 1,
    });
  };

  render() {
    return (
      <div className="countdown">
        <span
          className="cross"
          onClick={() => this.props.handleCross("countdown")}
        >
          X
        </span>
        <h2>Countdown</h2>
        <div className="countdown-label">Hours : Minutes : Seconds</div>
        <div className="countdown-display">
          <div className="timer-arrow">
            <button onClick={() => this.handleIncTime("hours")}>⬆</button>
            <button onClick={() => this.handleIncTime("mins")}>⬆</button>
            <button onClick={() => this.handleIncTime("secs")}>⬆</button>
          </div>

          <div className="countdown-time">00 : 00 : 00</div>
          <div className="timer-arrow">
            <button onClick={() => this.handleDecTime("hours")}>⬇</button>
            <button onClick={() => this.handleDecTime("mins")}>⬇</button>
            <button onClick={() => this.handleDecTime("secs")}>⬇</button>
          </div>
        </div>
        <button onClick={this.handleTimerStart} className="button-start">
          Start
        </button>
      </div>
    );
  }
}

class Stopwatch extends React.Component {
  constructor(props) {
    super();
    this.state = {
      time: 0,
      hr: 0,
      min: 0,
      sec: 0,
      ms: 0,
    };
  }

  handleTimer = (newHr, newMin, newSec, newMs) => {
    this.setState({
      active: false,
      hr: newHr,
      min: newMin,
      sec: newSec,
      ms: newMs,
    });
  };
  handleStart = () => {
    this.setState({
      active: true,
    });
  };

  render() {
    return (
      <>
        <div className="stopwatch">
          <span
            className="cross"
            onClick={() => this.props.handleCross("stopwatch")}
          >
            X
          </span>
          <h2>Stopwatch</h2>
          <div className="stopwatch-display">
            {this.state.active === true ? (
              <StopWatchTime
                state={this.state}
                handleTimer={this.handleTimer}
              />
            ) : (
              "00:00:00:00"
            )}
          </div>
          <button onClick={this.handleStart}>Start</button>
        </div>
      </>
    );
  }
}

class StopWatchTime extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hr: this.props.state.hr,
      min: this.props.state.min,
      sec: this.props.state.sec,
      ms: this.props.state.ms,
    };
    this.interval = null;
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      //   console.log(this.state.hr, this.state.min, this.state.sec);
      this.setState((prevState) => {
        let newHr = prevState.hr;
        let newMin = prevState.min;
        let newSec = prevState.sec;
        let newMs = prevState.ms;
        if (newMs + 1 < 100) {
          newMs = newMs + 1;
          this.props.handleTimer(newHr, newMin, newSec, newMs);
        } else if (newMs + 1 >= 100 && newSec + 1 < 60) {
          newMs = 0;
          newSec = newSec + 1;
          this.props.handleTimer(newHr, newMin, newSec, newMs);
        } else if (newSec + 1 >= 60 && newMin + 1 < 60) {
          newMs = 0;
          newSec = 0;
          newMin = newMin + 1;
          this.props.handleTimer(newHr, newMin, newSec, newMs);
        } else if (newSec + 1 >= 60 && newMin + 1 >= 60) {
          newMs = 0;
          newSec = 0;
          newMin = 0;
          newHr = newHr + 1;
          this.props.handleTimer(newHr, newMin, newSec, newMs);
        }
        console.log(newSec, newMin, newHr);
        return {
          hr: newHr,
          min: newMin,
          sec: newSec,
          ms: newMs,
        };
      });
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        {this.state.hr < 10 ? "0" + this.state.hr : this.state.hr}:{" "}
        {this.state.min < 10 ? "0" + this.state.min : this.state.min} :{" "}
        {this.state.sec < 10 ? "0" + this.state.sec : this.state.sec}:{" "}
        {this.state.ms < 10 ? "0" + this.state.ms : this.state.ms}{" "}
      </div>
    );
  }
}
export default App;
