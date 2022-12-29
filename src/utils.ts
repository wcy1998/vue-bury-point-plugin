export class OptionGenerator {

    options?: Array<any>

    keys?: Array<string>

    constructor(...keys: Array<string>) {
        this.options = []
        this.keys = keys
    }

    add(...values: Array<any>): OptionGenerator {

        let item: Record<string, any> = {}
        
        values?.forEach((value, idx) => {
            let key = this.keys && this.keys[idx]
            if (key) {
                item[key] = value
            }
        })
        this.options?.push(item)
        return this
    }

    form(): Array<any> {
        return this.options || []
    }


}

export function isAsyncFunction(fn:any){
    let fnStr =fn.toString()     
    return Object.prototype.toString.call(fn) === '[object AsyncFunction]' || fnStr.includes("return _regenerator.default.async(function")
}