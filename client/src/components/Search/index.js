import API from "../../utils/API";

class Search extends Component {

    state = {
        books: [],
        bookSearch: "",
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

      
 };
