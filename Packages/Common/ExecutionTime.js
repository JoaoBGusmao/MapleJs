class ExecutionTime {
  constructor() {
    this.timeStart = 0;
    this.lastBreak = 0;

    this.start = this.start.bind(this);
    this.break = this.break.bind(this);
  }

  start(msg) {
    console.log('\x1b[40m\x1b[37m', `-------${msg}-------`, '\x1b[0m');
    this.timeStart = Date.now();
  }

  break(msg) {
    const now = Date.now();
    const last = this.timeStart;
    console.log(now, last);
    console.log('\x1b[41m\x1b[37m', msg, (now - last), '\x1b[0m');
    this.lastBreak = now;
  }
}

export default ExecutionTime;
