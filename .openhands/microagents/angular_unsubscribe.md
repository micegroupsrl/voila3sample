---
name: Angular Unsubscribe Enforcement Agent
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - angular unsubscribe
  - rxjs subscription
  - ngondestroy
  - memory leak
  - observable cleanup
---

# Angular Unsubscribe Enforcement Microagent

## Purpose
This agent ensures that all Angular components which subscribe to at least one service (using `.subscribe()` on an Observable) implement proper unsubscription logic to prevent memory leaks.

## Guidance
- For every Angular component that calls `.subscribe()` on a service or observable, ensure:
  - The component stores the Subscription(s) in a class property (e.g., `private subscription: Subscription` or an array of subscriptions).
  - The component implements the `OnDestroy` interface and defines an `ngOnDestroy()` method.
  - All stored subscriptions are unsubscribed in `ngOnDestroy()`.
- If the component already uses async pipes for all subscriptions, no action is needed.

## Usage Example
- **Bad:**
  ```typescript
  this.service.getData().subscribe(data => { this.data = data; });
  ```
- **Good:**
  ```typescript
  private subscription: Subscription;
  ngOnInit() {
    this.subscription = this.service.getData().subscribe(data => { this.data = data; });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ```
- **Multiple Subscriptions:**
  ```typescript
  private subscriptions: Subscription[] = [];
  ngOnInit() {
    this.subscriptions.push(this.service.getData().subscribe(...));
    this.subscriptions.push(this.otherService.getOther().subscribe(...));
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  ```

## Limitations
- This agent only checks for direct `.subscribe()` calls in component TypeScript files.
- It does not enforce unsubscription for subscriptions managed by async pipes or handled by external libraries (e.g., `takeUntil`, `untilDestroyed`).

## Error Handling
- If a component subscribes to an observable but does not implement unsubscription, flag it and suggest the above pattern.

## References
- [Angular Docs: Prevent Memory Leaks](https://angular.io/guide/observables#prevent-memory-leaks)
- [RxJS Subscription](https://rxjs.dev/api/index/class/Subscription)
