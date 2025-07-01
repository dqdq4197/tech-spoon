import type { ComponentPropsWithoutRef, ComponentType, ElementType, JSX, ReactNode } from 'react'

/**
 * Polymorphic 컴포넌트를 감싸는 컴포넌트도 polymorphic 하게 만들 때,
 * 내부 polymorphic 컴포넌트의 generic 파라미터 타입을 타입 에러 없이 지정하는 것이 어려움
 * 이를 우회하기 위해 `any`를 사용하는데 사용처에서 eslint disable 주석 처리를 생략하고,
 * `any`를 쓰는 이유를 문서화하기 위해 정의한 타입
 * Polymorphic 컴포넌트를 감싸는 더 좋은 방법이 있다면 이 방식을 대체하면 좋음
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyElementType = any

export type AsProp<C extends ElementType> = {
  as?: C
}

type KeyWithAs<C extends ElementType, Props> = keyof (AsProp<C> & Props)

export type RefObjectOf<C extends ElementType> = C extends new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => ComponentType<any>
  ? InstanceType<C>
  : C extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[C] extends React.DetailedHTMLProps<infer _, infer T>
      ? T
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      C extends (props: any) => ReactNode
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any

export type PolymorphicComponentProps<C extends ElementType, Props = object> = (Props & AsProp<C>) &
  Omit<ComponentPropsWithoutRef<C>, KeyWithAs<C, Props>>

type CommonElementProps = Pick<ComponentPropsWithoutRef<'div'>, 'className' | 'style'>

/**
 * 중첩된 polymorphic 컴포넌트에서 대부분의 native elemnt가 받는 공통 props를 받을 수 있게
 * 하기 위한 컴포넌트 타입.
 */
export type BasicComponent = (props: CommonElementProps) => JSX.Element
