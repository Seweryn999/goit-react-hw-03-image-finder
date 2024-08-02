// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import ImageGallery from './imageGallery/ImageGallery';
import { apiUrl } from './js/api-url';
import { pixabayApiLuncher } from './js/pixabay-api-luncher';
import { ThreeDots } from 'react-loader-spinner';
import { scrollAfterLoad } from './js/scroll-after-load';

export class App extends Component {
  state = {
    querry: '',
    page: 1,
    perPage: 12,
    isLoading: false,
    pictures: [],
    error: null,
  };

  apiUrlState = async () => {
    const { querry, page, perPage } = this.state;
    this.setState({ isLoading: true });
    if (page === 1) {
      try {
        const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
        this.setState({ pictures: answer.data.hits });
      } catch (er) {
        this.setState({ error: er });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      try {
        const answer = await pixabayApiLuncher(apiUrl(querry, page, perPage));
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...answer.data.hits],
        }));
      } catch (er) {
        this.setState({ error: er });
      } finally {
        this.setState({ isLoading: false });
        if (this.state.page > 1) {
          scrollAfterLoad(520);
        }
      }
    }
  };

  submitHandlerSearch = value => {
    this.setState({ querry: value, page: 1 });
  };

  pageHandlerBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { pictures, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.submitHandlerSearch} />
        {isLoading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#2a6ccf"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {error !== null && <p>Wystąpił błąd: {error}</p>}
        {pictures.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ImageGallery data={this.state.pictures} />
            <Button pagehandler={this.pageHandlerBtn} />
          </div>
        )}
      </>
    );
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.querry !== this.state.querry ||
      prevState.page !== this.state.page
    )
      await this.apiUrlState();
  }
}
