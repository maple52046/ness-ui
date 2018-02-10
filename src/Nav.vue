<template>
<div id="nav">
  <span id="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <a href="/" id="home-link">
          <img id="logo" src="https://i.imgur.com/bNOcJJ1.png"/>
        </a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">Strategy</template>
        <el-menu-item index="2-1">
          <a href="/#/strategy1">Bollinger Bands with Trading Pair</a>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </span>
</div>
</template>

<script>
  export default {
    name: 'Nav',
    data (){
      return {
        activeIndex: '1'
      }
    }
  }
</script>

<style>
#logo {
  width: 30px;
}
#home {
  display: inline-block;
}
#home-link {
  text-decoration: none;
}
</style>

<!-- vim: ts=2 sw=2 expandtab

