import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../useful/load-post';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleloadPosts(0, postsPerPage);
  }, [handleloadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <p>Não existem posts :(</p>}

      <div className="button-container">
        {!searchValue && <Button disabled={noMorePosts} onClick={loadMorePosts} />}
      </div>
    </section>
  );
};

// export class Home extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 3,
//     searchValue: ''
//   }

//   async componentDidMount() {
//     await this.loadPosts()
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state
//     const postsAndPhotos = await loadPosts()

//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos
//     })
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state

//     const nextPage = page + postsPerPage
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

//     posts.push(...nextPosts)

//     this.setState({ posts, page: nextPage})
//   }

//   handleChange = event => {
//     const { value } = event.target

//     this.setState({ searchValue: value })
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state
//     const noMorePosts = page + postsPerPage >= allPosts.length

//     const filteredPosts = !!searchValue
//     ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLowerCase())
//     })
//     : posts

//     return (
//       <section className='container'>
//         <div className='search-container'>
//           {!!searchValue && (
//             <h1>Search Value: {searchValue}</h1>
//           )}

//           <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts :(</p>
//         )}

//         <div className='button-container'>
//           {!searchValue && (
//             <Button disabled={noMorePosts} onClick={this.loadMorePosts}/>
//           )}
//         </div>
//       </section>
//     )
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
