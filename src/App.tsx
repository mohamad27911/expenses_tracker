
import Card from './Components/Card'
import Form from './Components/Form'
import Table from './Components/Table'
import './index.css'
function App() {

  return (
    <div className='mx-16'>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 m-auto">
  <Card isProg={false} title="Total Income"/>
  <Card isProg={false} title="Total Expenses"/>
  <Card isProg={false} title="Remaining Balance"/>
  <Card isProg={true} title="Saving Goal"/>
 
 


  </div>
<Table/>
<Form/>
    </div>
  )
}

export default App
