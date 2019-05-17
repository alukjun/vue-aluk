import state from './states';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import modules from './modules';

console.log(modules)

export default {
    // 数据: Data
    state,
    // 基类: Method
    mutations,
    // 模块: Modules
    modules,
    // 行为: Action
    actions,
    // 钩子: Getters
    getters
}