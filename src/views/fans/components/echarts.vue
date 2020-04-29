<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
  <div ref="main" style="width: 600px;height:400px;">可视化图表</div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'FansEcharts',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  methods: {},
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用更指定的配置项和数据显示图表
    myChart.setOption(option)
  }
}
</script>
<style lang='less' scoped>
</style>
