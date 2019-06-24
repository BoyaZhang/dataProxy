/** warning!!! 由于ES5的限制，ES6新增的Proxy无法被转译成ES5，或者通过Polyfill提供兼容。!!!warning
 * @author         boyaz.zhang@qunar.com
 * @name           dataProxy
 * @description    多层级数据结构取值容错处理&初始化默认值
 * @params         obj(any type)
 * @path           供取值递归路径记录，勿传
 * @example        var data = {}
 *                 var list = dataProxy(data).data.onedaytour.list(); //undefined
 *                 or 指定默认值，多个默认值取第一个
 *                 var list = dataProxy(data).data.onedaytour.list([]); //[]
 **/
export function dataProxy(obj, path = []) {
    return new Proxy(() => {
    }, {
        get(target, property) {
            return dataProxy(obj, path.concat(property));
        },
        apply(target, self, args) {
            let val = obj;
            for (let i = 0; i < path.length; i++) {
                if (val === null || val === undefined) {
                    break;
                }
                val = val[path[i]];
            }
            return (val === null || val === undefined) && args[0] !== undefined ? args[0] : val;
        }
    });
}
