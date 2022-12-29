import { initBuryPointStore} from './init.js'

let Vue: any //就是vue对象

let BuryPointMap: Map<string, any> | null = null

let init = false

export function install(_Vue: any) {
    Vue = _Vue
    Vue.mixin({ beforeCreate: buryPointInit })
    Vue.mixin({ created: buryPointSet })
}



function buryPointInit(): void {

    if (!BuryPointMap&&!init) {

        if (this?.$options?.buryPointConfig ) {
            init = true
            this.$options.buryPointConfig && !this.$buryPointMap && (BuryPointMap = initBuryPointStore(this.$options.buryPointConfig))
        }
    }
}


function buryPointSet(): void {
    if (!BuryPointMap?.get(this.$options.name) || !this.$options.$buryPoint) {
        return
    }

    let configs = BuryPointMap?.get(this.$options.name)

    configs.forEach(({ fName, func }: any) => {
        let preFunc = this[fName]
        if (preFunc) {
            let newFunc = function () {
                func.bind(this)({ cName: this.$options.name, fName, param: arguments })
                return preFunc(...arguments)
            }.bind(this)
            this[fName] = newFunc
        } else {
            throw new Error(`[buryPoint] 当前组件中不存在配置对应的方法,
                             注意是否写错配置或者修改了原有组件的方法名`)
        }
    })
}

