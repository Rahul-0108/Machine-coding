leading: true, trailing: false

Scenario:
You call the function several times rapidly (within 1 second).

Time (ms) →   0     200   400   800       1200
             |-----|-----|-----|---------|-----
Calls        log() log() log() log()     log()
Execution    🔥                      🔥
             (fires)                (fires again)

🧠 Explanation
🔥 Fires immediately on the first call at 0ms (leading: true)

🚫 Ignores calls during the 1000ms debounce wait

✅ After 1000ms, if you call again (e.g., at 1200ms), it fires again immediately

✅ Summary
First call? ➝ Runs immediately ✅

Within 1000ms of that? ➝ Ignored ❌

After 1000ms? ➝ Next call runs immediately again ✅

No trailing execution at all




leading: false, trailing: true ( default )

Scenario:
You call the function multiple times rapidly.

Time (ms) →   0     200   400   800       1200
             |-----|-----|-----|---------|-----
Calls        log() log() log() log()     
Execution                                🔥
                                          (fires after 1000ms from last call)

🧠 Explanation
❌ Does not fire immediately on the first call (leading: false)

⏱ Keeps resetting the 1000ms timer each time you call it

✅ Fires once 1000ms after the last call

Only one call gets through, and it’s delayed

🧠 Explanation
🔥 Fires immediately on first call at 0ms (leading: true)

🚫 Ignores intermediate calls during wait period

✅ After 1000ms from the last call (800ms + 1000ms = 1800ms), fires again (trailing: true)


leading: true, trailing: true


Time (ms) →   0     200   400   800       1800
             |-----|-----|-----|---------|-----
Calls        log() log() log() log()     log()
Execution    🔥                        🔥        🔥
             (leading)               (trailing) (leading again)

🧠 Explanation
🔥 Fires immediately on first call at 0ms (leading: true)

🚫 Ignores intermediate calls during wait period

✅ After 1000ms from the last call (800ms + 1000ms = 1800ms), fires again (trailing: true)




🔁 Quick comparison
Setting                       	Fires immediately?	Fires after delay?
leading: true, trailing: false	✅ Yes              	❌ No
leading: false, trailing: true	❌ No               	✅ Yes
leading: true, trailing: true	  ✅ Yes	                ✅ Yes





