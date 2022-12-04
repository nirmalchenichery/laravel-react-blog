import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogListItemIndex from '@/Components/BlogListItemIndex';

export default function Index(props) {
    

    const { posts } = usePage().props


    
    console.log(props.blogs.data);


    // console.log(posts.blogs.data);


    // props.user


    // const fetchUrl = "/user";
    // const dbColumns = ["name","email","role"];
    // const displayColumns =  ["Name","Email","Role","Action"];
    // const redirectedTo ="user"; // Controller Action

     const blog_list = props.blogs.data.map( (blog, index) => {
        return <BlogListItemIndex key={index} blog={blog}/>
    })




    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome : {props.auth.user.name} .You have : {props.auth.user.role} rights</h2>}
        >
            <Head title="Admin Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <div className="container ps-5 pe-5">
                            <div className="row">
                                <div className="col-12 p-2 text-left text-dark mt-4">
                                
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>

                                    <div className="p-2 mt-4 mb-4">
                                        <Link
                                            tabIndex="1"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-green-500 rounded"
                                            style={{textDecoration: 'none'}}
                                            href={route("user.create")}
                                        >
                                             Create Post
                                        </Link>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="w-full">
                                        <div className="grid grid-cols-8">
                                            <div className="px-4 py-2 w-20 font-bold">No.</div>
                                            <div className="px-4 py-2 font-bold">Title</div>
                                            <div className="px-4 py-2 font-bold">Description</div>
                                            <div className="px-4 py-2 font-bold">Author</div>
                                            <div className="px-4 py-2 font-bold">Approved</div>
                                            <div className="px-4 py-2 font-bold">Posted at</div>
                                            <div className="px-4 py-2 font-bold">Action</div>
                                        </div>
                                </div>

                                <div id="resp-table">
                                    <div id="resp-table-header"></div>
                                    <div className="table-header-cell">No.</div>
                                    <div className="table-header-cell">Title</div>
                                    <div className="table-header-cell">Description</div>
                                    <div className="table-header-cell">Author</div>
                                    <div className="table-header-cell">Approved</div>
                                    <div className="table-header-cell">Posted at</div>
                                    <div className="table-header-cell">Action</div>
                                    <div id="resp-table-body">
                                        {blog_list}
                                    </div>
                                </div>
                                {/* <DataTable  fetchUrl={fetchUrl} 
                                            columns ={dbColumns} 
                                            displayColumns={displayColumns} 
                                            redirectedTo = {redirectedTo}
                                /> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
