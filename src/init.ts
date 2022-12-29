


import { BuryPointConfig} from "../types/index.js";
import { unionBy } from "lodash-es";


//初始化配置
export function initBuryPointStore(buryPointConfigs: Array<BuryPointConfig>) {

    const BuryPointStore = new Map()

    function traverse(buryPointConfigs: Array<BuryPointConfig>) {
        try {
            buryPointConfigs.forEach(({ component: { name, $buryPoint },config, fName, func, child }: BuryPointConfig) => {
                if (!name) {
                    throw new Error(`[buryPoint] 配置中${fName||config?.map(({fName})=>fName).join(',')}方法所对应的组件没有设置name，用于标识组件唯一性`)
                }
                if (!$buryPoint) {
                    throw new Error(`[buryPoint] 配置中组件${name}没有标记$buryPoint，用于标识组件唯一性`)
                }
                if(config&&fName){
                    throw new Error(`[buryPoint] 组件${name}已使用config去配置，无需fName`)
                }
                    
                if (!BuryPointStore.get(name)) {
                    let configs = config || [{fName,func}]
                    
                    if(unionBy(configs,'fName').length!==configs.length){
                        throw new Error(`[buryPoint] 组件${name}同个方法设置多次`)
                    }

                    BuryPointStore.set(name, configs)
                    if (child) {
                        traverse(child)
                    }
                } else {
                    let preConfig =  BuryPointStore.get(name)
                    let curConfigs = config || [{fName,func}]
                     
                    curConfigs?.forEach(({fName,func})=>{
                         if(preConfig.findIndex((item:any)=>item.fName===fName)>-1){
                            throw new Error(`[buryPoint] 组件${name}同个方法${fName}设置多次`) 
                         }else{
                            preConfig.push({fName,func})
                         }
                    })
                }
            })
        } catch (e) {
            throw new Error(`[buryPoint] 配置存在问题${e}`)
        }

    }
    traverse(buryPointConfigs)

    return BuryPointStore

} 