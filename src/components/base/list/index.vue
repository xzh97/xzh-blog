<template>
    <div class="list-wrapper">
        <ul class="custom-list-wrapper">
            <li slot="renderItem"></li>
        </ul>
    </div>
    
</template>

<script>
export default {
    name: 'list',
    props:{
        dataSource: {
            type: Array,
            default(){
                return []
            }
        },
        listKey: {
            type: String,
        }

    },
    setup(props){

    }
}
</script>

<style lang='scss'>
.custom-list-wrapper{
    padding: .3rem;
}
</style>