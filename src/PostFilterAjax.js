import React, {Component} from "react";
import axios from "axios";
// import { useState, useEffect } from "react";

class PostFilterAjax extends Component{
    constructor(props){
        super(props);
        this.state ={
            posts: [],
            filterh1: false,
            filterNoH2H3: false,
            filterTestKeyword: false,
            filterAuthorIdone: false,
            filterDateRange: false
            
        }

    }
   
    componentDidMount(){
        axios.get('http://localhost/test/wp-json/wp/v2/posts').then(response=>{

        //console.log(response);
        response.data.forEach(element => {
            element.visibility = true
        });
        console.log(response.data);
        this.setState({posts:response.data}, () => {console.log(this.state.posts)});
        });
        // console.log(this.state.posts);
    }
    setFilterWithH1 = () => {
        // alert('yes');
        // console.log('before ', this.state.filterh1);
        this.setState(
            {
                filterh1:!this.state.filterh1
            }, this.filterPostData
        )
        
    }
    setFilterWithoutH2h3tag = () => {
        this.setState(
            {
                filterNoH2H3:!this.state.filterNoH2H3
            },this.FilterPostData
        )
        
    }

    setFilterWithTestKeyword = () => {
        this.setState(
            {
                filterTestKeyword:!this.state.filterTestKeyword
            },this.FilterPostData
        )
        
    }

    setFilterAuthorId1 = () => {
        this.setState(
            {
                filterAuthorIdone:!this.state.filterAuthorIdone
            },this.FilterPostData
        )
        
    }

    setFilterDateRange = () => {
        this.setState(
            {
                filterDateRange:!this.state.filterDateRange
            },this.FilterPostData
        )
       
    }
        
    filterPostData = () => {
        
        if(this.state.filterh1){
           alert('cHECKED');
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(date.getFullYear()).slice(2); // Get last two digits of year
        return `${day}/${month}/${year}`;
    }

    render(){
        return(
            <>
            <div className="postfilter">
                <h2>Filter Conditions</h2>
                <div className="checkboxwrap">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={this.setFilterWithH1}/>
                    <label className="custom-control-label" for="customCheck1">Posts with multiple H1 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck2" onClick={this.setFilterWithoutH2h3tag}/>
                    <label className="custom-control-label" for="customCheck1">Posts without H2 and H3 tags.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck3" onClick={this.setFilterWithTestKeyword}/>
                    <label className="custom-control-label" for="customCheck1">Posts with keyword 'Test'.</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck4" onClick={this.setFilterAuthorId1}/>
                    <label className="custom-control-label" for="customCheck1">Posts with author id 1</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck5" onClick={this.setFilterDateRange}/>
                    <label className="custom-control-label" for="customCheck1">Posts by date range 01/01/2021 to 01/01/2022</label>
                </div>
                </div>

                <div className="posttablewrap">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>Post Id</td>
                                <td>Title</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.posts.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{item.id}</td>
                                            <td><a href="{item.link}">{item.title.rendered}</a></td>
                                            <td>{this.formatDate(item.date)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                    </table>
                </div>
            </div>
            </>
        )
    }
}

export default PostFilterAjax;