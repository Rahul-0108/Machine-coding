/**
 * Read FAQs section on the left for more information on how to use the editor
**/
/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO NOT CHANGE CLASS NAME OR METHOD NAMES
// FEEL TO ADD METHODS

class SDK {
  constructor() {
    this.events = [];
    this.count = 1;
    this.maxRetries = 3;
    this.failCount = 0;
  }

  log(eventName) {
    this.events.push(eventName);
  }

  wait(event) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.count % 5 !== 0 || this.failCount >= 1) {
          resolve(`Success: ${event}`);
        } else {
          reject(event);
        }
      }, 1000)
    })
  }

  async send() {
    if (!this.events.length) {
      return 'No events available to be executed';
    }

    while (this.events.length) {

      const current = this.events.shift();

      try {
        const data = await this.wait(current);
        console.log(data);
        this.count++;
        if (this.failCount > 0) {
          this.failCount = 0;
        }
      } catch (err) {
        if (this.failCount < this.maxRetries) {
          this.failCount++;
          console.log(`---RETRYING ${this.failCount}/${this.maxRetries}--- ${current}`);
          this.events.unshift(current);
        } else {
          console.log(`event ${current} failed after ${this.failCount}/${this.maxRetries}`)
        }
      }
    }
  }
}

// const sdk = new SDK();

// // Logging events
// sdk.log("event 1");
// sdk.log("event 2");
// sdk.log("event 3");
// sdk.log("event 4");
// sdk.log("event 5");

// // Start processing events
// sdk.send();
// // could be await sdk.send();

// // Success: event 1
// // Success: event 2
// // Success: event 3
// // Success: event 4
// // ---RETRYING 1/3--- event 5
// // Success: event 5
