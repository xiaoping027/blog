Uni-app小程序Swiper 优化
问题：Swiper长列表组件渲染卡顿问题

动态删掉swiper-item的思路不可行

swiper是单页组件，适合做banner图轮播和简单列表左右滑动 

在App端使用了nvue的原生渲染，实现高性能的左右拖动长列表；并支持可自定义的任何形式的下拉刷新。在非App端使用的模式是只缓存左右一共3列的数据，dom中的数据过多时，它会自动释放。就是说App上，只要看过这一页，再进去时内容是还在的。在App上，只能做到缓存3页数据，其他页即便看过，再进去也会重新加载。并且非App的这种情况下，不再提供下拉刷新

优化方法 一
通过 Swiper 的 current 只显示前后3个swiper-item 里面的内容 

    <swiper
      :current="displayMonthIndex"
      :vertical="!inline"
      :class="['swiper', { 'high-swiper': longMonth }]"
      :previous-margin="previousMargin"
      :next-margin="nextMargin"
      @change="monthChange"
    >
      <block v-for="(month, idx) in months" :key="idx">
        <swiper-item>
          <template
            v-if="
              month.index === displayMonthIndex ||
              month.index + 1 === displayMonthIndex ||
              month.index - 1 === displayMonthIndex
            "
          >
            <view
              :id="month.currentMonth ? 'current-month' : ''"
              class="month"
              :class="{
                'current-month': month.currentMonth,
                first: idx === 0,
                'select-month': idx === displayMonthIndex,
              }"
            >
              <view class="title">
                {{ month.title }}
                <view v-if="inline" class="switch-icon">
                  <base-icon
                    class="base-icon reverse left-icon"
                    :class="{ disabled: displayMonthIndex === 0 }"
                    :name="combinedOptions.rightArrowName"
                    @click="previousMonth"
                  ></base-icon>
                  <base-icon
                    class="base-icon"
                    :class="{
                      disabled: displayMonthIndex === months.length - 1,
                    }"
                    :name="combinedOptions.rightArrowName"
                    @click="nextMonth"
                  ></base-icon>
                </view>
              </view>
              <view v-if="inline" class="week-bar">
                <view class="week">
                  <view v-for="day in week" :key="day" class="day">
                    {{ day }}
                  </view>
                </view>
              </view>
              <view
                v-for="(w, weekIdx) in month.weeks"
                :key="weekIdx"
                class="week"
              >
                <view
                  v-for="day in w"
                  :key="day.number"
                  class="day"
                  :class="{
                    hide: day.number === 0,
                    today: month.currentMonth && month.today === day.number,
                    start: day.isStart,
                    end: day.isEnd,
                    cross: day.isCross,
                    disabled: day.disabled,
                  }"
                  @click="onClick(month, day)"
                >
                  <view class="cube">
                    <text v-if="day.isStart && !day.isEnd" class="prefix">
                      {{ combinedOptions.startText }}
                    </text>
                    <text v-if="day.isEnd && !day.isStart" class="prefix">
                      {{ combinedOptions.endText }}
                    </text>
                    <text v-if="day.isEnd && day.isStart" class="prefix">
                      {{ combinedOptions.sameDayText }}
                    </text>
                    <text class="number">{{ day.number }}</text>
                  </view>
                </view>
              </view>
            </view>
          </template>
        </swiper-item>
      </block>
    </swiper>

优化方法 二 思路 
固定 3 个 swiper-item

利用前后衔接滑动 动态生成数据
<!--br {mso-data-placement:same-cell;}--> td {white-space:pre-wrap;border:1px solid #dee0e3;}circularBooleanFALSE是否采用衔接滑动，即播放到末尾后重新回到开头
固定3个swiper-item，前后滑动的时候去替换数据

正向滑动的时候去替换滑动后的下一页数据，反向滑动的时候去替换滑动后的上一页数据

Tip 边界问题处理 第一个和最后一个 后面没数据的情况应该怎么展示？ 
