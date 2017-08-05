import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header.js';
import Content from './components/content.js';
import Footer from './components/footer.js';

class Layout extends React.Component{
    componentDidMount() {
        document.title = "Check Your Uber History";
    }

    render(){
        return <div>
                    <Header />
                    <Content />
                    <Footer />
               </div>;
    }
}

ReactDOM.render(<Layout />, document.getElementById('app'));