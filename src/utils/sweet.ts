export function letIf<N, T>(nullable: N, callback: (value: NonNullable<N>) => T): T | undefined
export function letIf<N1, N2, T>(
  nullable1: N1,
  nullable2: N2,
  callback: (value1: NonNullable<N1>, value2: NonNullable<N2>) => T
): T | undefined
export function letIf<N1, N2, N3, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  callback: (value1: NonNullable<N1>, value2: NonNullable<N2>, value3: NonNullable<N3>) => T
): T | undefined
export function letIf<N1, N2, N3, N4, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  nullable4: N4,
  callback: (
    value1: NonNullable<N1>,
    value2: NonNullable<N2>,
    value3: NonNullable<N3>,
    value4: NonNullable<N4>
  ) => T
): T | undefined
export function letIf<N1, N2, N3, N4, N5, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  nullable4: N4,
  nullable5: N5,
  callback: (
    value1: NonNullable<N1>,
    value2: NonNullable<N2>,
    value3: NonNullable<N3>,
    value4: NonNullable<N4>,
    value5: NonNullable<N5>
  ) => T
): T | undefined
export function letIf<T>(...args: unknown[]): T | undefined {
  const callback = args.pop() as (...args: unknown[]) => unknown
  if (args.every(($0) => $0 !== undefined && $0 !== null)) {
    return callback.call(null, ...args)
  }
  return undefined
}

export function letIfTruthy<N, T>(
  nullable: N,
  callback: (value: NonNullable<N>) => T
): T | undefined
export function letIfTruthy<N1, N2, T>(
  nullable1: N1,
  nullable2: N2,
  callback: (value1: NonNullable<N1>, value2: NonNullable<N2>) => T
): T | undefined
export function letIfTruthy<N1, N2, N3, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  callback: (value1: NonNullable<N1>, value2: NonNullable<N2>, value3: NonNullable<N3>) => T
): T | undefined
export function letIfTruthy<N1, N2, N3, N4, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  nullable4: N4,
  callback: (
    value1: NonNullable<N1>,
    value2: NonNullable<N2>,
    value3: NonNullable<N3>,
    value4: NonNullable<N4>
  ) => T
): T | undefined
export function letIfTruthy<N1, N2, N3, N4, N5, T>(
  nullable1: N1,
  nullable2: N2,
  nullable3: N3,
  nullable4: N4,
  nullable5: N5,
  callback: (
    value1: NonNullable<N1>,
    value2: NonNullable<N2>,
    value3: NonNullable<N3>,
    value4: NonNullable<N4>,
    value5: NonNullable<N5>
  ) => T
): T | undefined
export function letIfTruthy<T>(...args: unknown[]): T | undefined {
  const callback = args.pop() as (...args: unknown[]) => unknown
  if (args.every(Boolean)) {
    return callback.call(null, ...args)
  }
  return undefined
}

export function assertUnreachable(..._args: never[]): never {
  throw new Error("Didn't expect to get here")
}

export function expectUnreachable(message?: string): never {
  throw new Error(message ?? "Didn't expect to get here")
}

export function checkUnreachable(..._args: never[]): void {}

export function asTruthyOrThrow<T>(
  value: T | null | undefined,
  errorMessage?: string
): NonNullable<T> {
  if (value) {
    return value as NonNullable<T>
  }
  throw new Error(errorMessage ?? `${value} is not truthy value`)
}
