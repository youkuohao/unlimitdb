class SideBar extends Component {

  render(){

    var pathname = pathname || req.pathname;

    var matchPath = function (path, result){
      var result = result||'active';
      return pathname.match(path)?result:'';
    };


    return (
        <ul class="nav nav-list">
          <li class="{{matchPath(/^\/$/, 'active', 1)}}">
            <a class="menu-text link" href="{{conf.hrefPrefix}}/">控制台</a>
          </li>

          <li class="{{matchPath('/app')}}">
            <a href="{{conf.hrefPrefix}}/app" class="menu-text">应用中心</a>
          </li>

          <li class="{{matchPath('/host')}}">
            <a href="{{conf.hrefPrefix}}/host" class="menu-text">网站中心</a>

          </li>

          <li class="{{matchPath('/location')}}">
            <a href="{{conf.hrefPrefix}}/location" class="menu-text">网页(移至网页中心)</a>
          </li>


          <!--<li class="{{matchPath('/doc')}}">-->
      <!--<span class="menu-text link">文档</span>-->
      <!--<ul class="submenu nav {{matchPath('/doc', 'open')}}">-->
      <!--<li class="{{matchPath('/doc/api')}}">-->
      <!--<a class="link" href="{{conf.hrefPrefix}}/doc/api">申请</a>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</li>-->

        </ul>


  )
  }
}