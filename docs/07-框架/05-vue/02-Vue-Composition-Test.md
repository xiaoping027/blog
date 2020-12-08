Vue Composition Test
useBoolean
import { ref } from 'vue-demi'
/**
 * 返回一个响应式布尔值和一些工具供使用。
 *
 * @param defaultValue 默认值。
 * @returns state 设定初始值。
 * @returns setTrue 设定值为真。
 * @returns setFalse 设定值为假。
 * @returns toggle 翻转值。
 */
export const useBoolean = (defaultValue = false) => {
  const state = ref(defaultValue)
  const setTrue = () => {
    state.value = true
  }
  const setFalse = () => {
    state.value = false
  }
  const toggle = () => {
    state.value = !state.value
  }
  return [state, setTrue, setFalse, toggle] as const
}


import { useBoolean } from '../index'
describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined()
  })
  it('test on methods', () => {
    const [state, setTrue, setFalse, toggle] = useBoolean()
    expect(state.value).toBeFalsy()
    setTrue()
    expect(state.value).toBeTruthy()
    setFalse()
    expect(state.value).toBeFalsy()
    toggle()
    expect(state.value).toBeTruthy()
    toggle()
    expect(state.value).toBeFalsy()
  })
  it('test on optional', () => {
    const [state] = useBoolean(true)
    expect(state.value).toBeTruthy()
  })
})


useTimeoutFn

import { onUnmounted } from 'vue-demi'
export const useTimeoutFn = (fn: Function, interval = 1000) => {
  let timer: number
  const clear = () => {
    timer && clearTimeout(timer)
  }
  const timeFn = () => {
    timer = setTimeout(fn, interval)
  }
  onUnmounted(() => clear())
  return { timeFn }
}

import { useTimeoutFn } from '../index'
import renderHook from '@ea/ea-use-test-utils'
let wrapper
const callback = jest.fn()
beforeEach(() => {
  jest.useFakeTimers()
  wrapper = renderHook(() => {
    const { timeFn } = useTimeoutFn(callback, 3000)

    return { timeFn }
  })
})
describe('useTimeout', () => {
  it('should be defined', () => {
    expect(useTimeoutFn).toBeDefined()
  })
  it('should return true after 3000ms', () => {
    expect(callback).not.toBeCalled()
    wrapper.vm.timeFn()
    expect(jest.getTimerCount()).toBe(1)
    jest.runOnlyPendingTimers()
    expect(callback).toBeCalled()
    expect(jest.getTimerCount()).toBe(0)
    expect(callback).toHaveBeenCalledTimes(1)
  })
  it('should clear when onUnmounted', () => {
    wrapper.vm.timeFn()
    expect(jest.getTimerCount()).toBe(1)
    wrapper.vm.$destroy()
    expect(jest.getTimerCount()).toBe(0)
  })
})


renderHook
和需要执行生命周期的 composititon use 必须在setup执行

import { shallowMount } from '@vue/test-utils'
import { defineComponent } from '@vue/composition-api'
export default function renderHook<V>(setup: () => V) {
  const App = defineComponent({
    template: `
      <div ref="app" id="app" :style="{ width: '1280px', height: '800px' }">
      </div>
    `,
    setup,
  })
  return shallowMount<Vue & V>(App, {})
}

Vue Test Utils 官方测试工具
shallowMount 和 mount
shallowMount 和 mount 一样，创建一个包含被挂载和渲染的 Vue 组件的 Wrapper，不同的是被存根的子组件。
Vue Test Utils 允许你通过 shallowMount 方法只挂载一个组件而不渲染其子组件 (即保留它们的存根)

mount刨根问底去渲染组件，祖宗十八代都不会放过，shallowMount 敷衍了事，不牵扯子组件内容

基本准则：所有使用shallowMount的地方都可以用mount替换，但是但凡能使用shallowMount的地方坚决不用mount

Wrapper
一个 Wrapper 是一个包括了一个挂载组件或 vnode，以及测试该组件或 vnode的方法

属性
vm
Component (只读)：这是该 Vue 实例。你可以通过 wrapper.vm 访问一个实例所有的方法和属性。这只存在于 Vue 组件包裹器或绑定了 Vue 组件包裹器的 HTMLElement 中。
element
HTMLElement (只读)：包裹器的根 DOM 节点
options
options.attachedToDocument
Boolean (只读)：如果组件在渲染之后被添加到了文档上则为 true
selector
Selector: 被 find() 或 findAll() 创建这个 wrapper 时使用的选择器。

https://vue-test-utils.vuejs.org/zh/api/wrapper/
// count.vue
<template>
  <div>
    <p>{{count}}</p>
    <button @click="add">增加</button>
  </div>
</template>
<script>
export default {
  data() {
    return{
      count: 0
    }
  },
  methods: {
    add() {
      this.count++
    }
  },
}
</script>


import { mount } from '@vue/test-utils';
import count from 'count.vue';
describe('count.vue组件', () => {
  it('测试count组件能否正常显示并增加', () => {
    const wrapper = mount(count, {}) // 使用 mount 创建一个vue组件实例 wrapper
    expect(wrapper.find('p').text()).toBe(0); // 判断p标签中的值是否为初始化0
    wrapper.find('button').trigger('click'); // 使用trigger('click')模拟用户的点击操作
    expect(wrapper.find('p').text()).toBe(1); // 经过模拟点击操作后，count的值应该增加成为1
  })
})

Vue Testing Library

Vue Testing Library 测试库通过添加用于Vue组件的API在DOM测试库的基础上构建。 它基于Vue的官方测试库@vue/test-utils构建

<template>
  <div>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
  </div></template>
<script>
  export default {
    data: () => ({
      count: 0,
    }),

    methods: {
      increment() {
        this.count++
      },
    },
  }</script>

import { render, fireEvent } from '@testing-library/vue'
import Component from './Component.vue'

test('increments value on click', async () => {
  // The render method returns a collection of utilities to query your component.
  const { getByText } = render(Component)

  // getByText returns the first matching node for the provided text, and
  // throws an error if no elements match or if more than one match is found.
  getByText('Times clicked: 0')

  const button = getByText('increment')

  // Dispatch a native click event to our button element.
  await fireEvent.click(button)
  await fireEvent.click(button)

  getByText('Times clicked: 2')})

https://testing-library.com/docs/vue-testing-library/intro


组件测试

<template>
  <div>
    <input v-model="username">
    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Hello',
  data () {
    return {
      username: ''
    }
  },

  computed: {
    error () {
      return this.username.trim().length < 7
        ? 'Please enter a longer username'
        : ''
    }
  }
}</script>

import { shallowMount } from '@vue/test-utils'import Hello from './Hello.vue'

test('Hello', () => {
  // 渲染这个组件
  const wrapper = shallowMount(Hello)

  // `username` 在除去头尾空格之后不应该少于 7 个字符
  wrapper.setData({ username: ' '.repeat(7) })

  // 确认错误信息被渲染了
  expect(wrapper.find('.error').exists()).toBe(true)

  // 将名字更新至足够长
  wrapper.setData({ username: 'Lachlan' })

  // 断言错误信息不再显示了
  expect(wrapper.find('.error').exists()).toBe(false)
})

不支持在 Doc 外粘贴 block


