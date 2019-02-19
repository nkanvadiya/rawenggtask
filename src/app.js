import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";

class App extends React.Component {
        constructor(props) {
                super(props);
                this.state = { 
                        val: '',
                        display: '',
                        duplicate : ''
                };
                
                this.handleChange = this.handleChange.bind(this);
        }

        getRange(v) {
                let val = v.split("-").map(Number);
                
                let start = val[0];
                let end = val[1];

                if( start && end && start < end ){
                        return Array(end - start + 1).fill().map((_, idx) => start + idx);
                }
        }
        
        getDuplicate(v){
                var uniq = v.map((val) => {
                        return {count: 1, val: val}
                }).reduce((a, b) => {
                        a[b.val] = (a[b.val] || 0) + b.count
                        return a
                }, {});

                return Object.keys(uniq).filter((a) => uniq[a] > 1);
        }
        
        handleChange(e) {
                let v = e.target.value;
                let val = v.split(",");
                
                let display = val.map( (v) => {
                        if( v.includes("-") ){
                                return this.getRange( v );
                        }else{
                                return v;
                        }
                }).flat();

                this.setState({
                        val: v,
                        display : display,
                        duplicate : this.getDuplicate( display )
                });
        }

        render() {

                const { val, display, duplicate } = this.state;

                return (
                        <div className="container">                                  
                                <input 
                                        type="text" 
                                        name="list" 
                                        autoComplete="off" 
                                        value={val} 
                                        onChange={this.handleChange} />
                                <br/>
                                <strong>Input : </strong> { val }
                                <br/>
                                <strong>Display : </strong> { display.toString()  }
                                <br/>
                                <strong>Duplicate : </strong> { duplicate.toString() }
                        </div>
                );
        }
}

export default App;