import React from "react";
import axios from "axios";
import { Card } from "./Card";
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


class App extends React.Component {
  state = {
    items: [],
    name: "",
    price: "",
    isLoading: false,
  };

  getItems = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios({
        method: 'get',
        url: 'https://vangal.ru/items',
      });
      this.setState({ items: data.data });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  addItem = async () => {
    this.setState({ isLoading: true });
    await axios({
      method: 'post',
      url: 'https://vangal.ru/add-item',
      data: {
        name: this.state.name,
        price: this.state.price,
      }
    });

    this.setState({
      name: "",
      price: "",
    })

    this.getItems();
  }

  componentDidMount() {
    this.getItems();
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handlePriceChange = (e) => {
    this.setState({ price: e.target.value });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )
    }

    return (
      <>
        <label>
          Наименование:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Цена:
          <input type="text" value={this.state.price} onChange={this.handlePriceChange} />
        </label>
        <button onClick={this.addItem}>ADD-ITEM</button>
        {this.state.items.map((item, index) => (
          <Card
            key={item.id}
            name={item.name}
            price={item.price}
          />
        ))}
      </>
    );
  }
}

export default App;