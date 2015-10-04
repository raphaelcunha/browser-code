declare module 'angular2/src/core/facade/async' {
  export class ObservableWrapper {
    static subscribe(emitter: any, onNext: Function, onThrow?: Function, onReturn?: Function);
  }

  export interface PromiseCompleter<R> {
    promise: Promise<R>;
    resolve: (value?: R | PromiseLike<R>) => void;
    reject: (error?: any, stackTrace?: string) => void;
  }

  export class PromiseWrapper {
    static all(promises: any[]): Promise<any>;
    static catchError<T>(promise: Promise<T>, onError: (error: any) => T | PromiseLike<T>): Promise<T>;
    static completer(): PromiseCompleter<any>;
    static reject(obj: any, _): Promise<any>;
    static resolve<T>(obj: T): Promise<T>;
    static then<T, U>(promise: Promise<T>, success: (value: T) => U | PromiseLike<U>, rejection?: (error: any, stack?: any) => U | PromiseLike<U>): Promise<U>;
    static wrap<T>(computation: () => T): Promise<T>;
  }
}


declare module 'angular2/src/core/facade/browser' {
  var document: Document;
  var location: Location;
  var window: Window;
}


declare module 'angular2/src/core/facade/lang' {
  class Json {
    static parse(s: string): any;
    static stringify(data: Object): string;
  }

  function CONST(): ClassDecorator;
  function isPresent(obj: any): boolean;
  function isBlank(obj: any): boolean;
  function isString(obj: any): boolean;
  function isFunction(obj: any): boolean;
  function isType(obj: any): boolean;
  function isStringMap(obj: any): boolean;
  function isPromise(obj: any): boolean;
  function isArray(obj: any): boolean;
  function isNumber(obj: any): boolean;
  function isDate(obj: any): boolean;
}


declare module 'angular2/test' {
  class AsyncTestCompleter {}

  class TestComponentBuilder {
    createAsync();
  }

  function afterEach(fn: Function);
  function beforeEach(fn: Function);
  function describe(...args);
  function ddescribe(...args);
  function xdescribe(...args);
  function expect(actual: any);
  function it(name, fn, timeOut?);
  function iit(name, fn, timeOut?);
  function xit(name, fn, timeOut?);

  function inject(tokens: any[], fn: Function);
}