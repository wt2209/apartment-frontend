<template>
    <div class="">
        <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
          <li class="active"><a href="#control-sidebar-skin-tab" data-toggle="tab"><i class="fa fa-wrench"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <!-- Stats tab content -->
          <div class="tab-pane active" id="control-sidebar-skin-tab">
            <div>
              <ul class="list-unstyled clearfix">
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                    <div>
                      <span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span>
                      <span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span>
                    </div>
                    <div>
                      <span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span>
                      <span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span>
                    </div>
                  </a>
                  <p class='text-center no-margin'>蓝色</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>黑色</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>紫色</p>
                </li>


                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>绿色</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>红色</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>黄色</p>
                </li>

                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮蓝</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮黑</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮紫</p>
                </li>

                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮绿</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮红</p>
                </li>
                <li style="float:left; width: 33.33333%; padding: 5px;">
                  <a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>
                  <div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>
                  <div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>
                  </a>
                  <p class='text-center no-margin'>亮黄</p>
                </li>


              </ul>
            </div>
          </div>
          <!-- /.tab-pane -->
        </div>
      </aside>
      <!-- /.control-sidebar -->
      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>

</template>

<script>
export default {
  name: 'right-side',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.changeSkinSetUp()
  },
  methods: {
    changeSkinSetUp() {
      this.getLocalSkin()
      this.setEventListener()
    },
    getLocalSkin(){
      var tmp = get_skin('skin');
      if (tmp && $.inArray(tmp, my_skins)){
        change_skin(tmp)
      }
    },
    setEventListener(){
      //Add the change skin listener
      $("[data-skin]").on('click', function (e) {
        e.preventDefault();
        change_skin($(this).data('skin'));
      })
      // close sidebar listener
      $('.content-wrapper').on('click', function(e){
          $('.control-sidebar').removeClass('control-sidebar-open')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
