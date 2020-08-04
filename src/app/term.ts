
type link = {
    alias: string,
    value: string
}
export interface Term {
    _id:string
    term:string
    desc:string
    tags:string[]
    links:link[]
}