declare type Nullable<T> = null | T;
declare type Undetectable<T> = undefined | T;
declare type TimeoutType = Undetectable<ReturnType<typeof setTimeout>>
declare type IntervalType = string | number | TimeoutType

export type NavItemType = {
  page: 'timeline' | 'activities' | 'progress',
  icon: string,
}
export type SelectOptionType = {
  value: number,
  label: string
}

export type TimelineItemType = {
  hour: number | string,
  activityId:  Nullable<string>,
  activitySeconds: number,
  isActive: false,
}

