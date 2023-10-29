import "reflect-metadata";

export const routeClassRegistry: any[] = [];

export function Register(target: any) {
  Reflect.defineMetadata("registered", true, target);
  routeClassRegistry.push(target);
}
