import { useState } from 'react'
import { Header, Form, Item, Container, Grid } from 'semantic-ui-react'
import axios from 'axios';
require('dotenv').config()


const App = () => {
  const [stock, setStock] = useState("")
  const [stockInfo, setStockInfo] = useState([])

  const handleSubmit = () => {
    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${process.env.REACT_APP_ACCESS_KEY}`)
      .then( res => {
        setStockInfo(Object.values(res.data)[0])
      })
      .catch( err => alert(err))
  }
  
  const stockInfoDetails = Object.entries(stockInfo).map(([key,value]) => {
    return (
      <Item>
        <Item.Content verticalAlign='middle'>
          {key} : {value.toString()}
        </Item.Content>
      </Item>
    );
  })
  return(
    <Container>
      <Header as="h1" textAlign='center'>Stock App</Header>
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name='stock'
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              label="Search up your stock:"
            />
            <Form.Button>Submit</Form.Button>
          </Form>
          </Grid.Column>
          <Grid.Column>
          <Item.Group divided>
            { stockInfoDetails }
          </Item.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App;