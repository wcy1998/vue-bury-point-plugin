 export interface BuryPointConfig {
        component :any //当前配置所对应的组件
        config?:Array<NameFuncObj>,
        fName: string //与埋点操作绑定的方法名
        func: ()=>void //当前的方法所要执行的埋点操作 执行的作用域为当前vue实例
        child ?: Array<BuryPointConfig>
}

export interface NameFuncObj{
    fName:string
    func:()=>void
}