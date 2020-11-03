<template>
<div>
       <div id="main" style="width: 600px;height:400px;"></div>   
</div>
</template>
<script>
   import {mapGetters,mapActions} from "vuex"
   import echarts from 'echarts'
export default {
components:{
 },
 computed: {
     ...mapGetters({
         list:'classify/list'
     })
 },
data () {
 return {
 }
},
methods:{
  ...mapActions({
     reqList:"classify/requestClassifyList"
  })
},
mounted(){
     this.reqList()
    //  console.log(this.list)
},
watch: {
    list:{
        handler(){
         if(this.list.length>0){
               var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品分类详情'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
             data:  this.list.map(item =>{
                    return item.catename
                })
            },
            yAxis: {},
            series: [{
                name: '产品数量',
                type: 'line',
                data: this.list.map(item =>{
                    return item.children.length
                })
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
         }
        },
        deep:true
    }
},
}
</script>
<style scoped>
</style>