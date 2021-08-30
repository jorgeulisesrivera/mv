import Sidebar from '../../containers/Sidebar'
import Content from '../../containers/Content'

 const HomePage = () => {

  return (<div style={{width:"100%",display:"flex",flexdirection:"row"}}>
    <div style={{flex:1,padding:20}}>

    <Sidebar/>

    </div>
    <div style={{flex:5,padding:20}}>

     <Content/>
    
    </div>
  </div>
  )
}

export default HomePage;
