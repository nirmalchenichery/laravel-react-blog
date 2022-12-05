import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogListItemIndex from '@/Components/BlogListItemIndex';
import DataTable from '@/Components/DataTable';
import Pagination from '@/Components/Pagination';

export default function Index(props) {

    const { posts } = usePage().props
    
    // const fetchUrl = "/getblog";
    // const dbColumns = ['user_id','language','title','description','content','author','author_image_url',
    //                    'image_url_portrait','image_url_landscape','is_trending','is_display','is_approved','posted_at'];

    // const displayColumns =  ["ID","Title","Description","Author","Approved","Posted at","Action"];
    // const redirectedTo ="blog"; // Controller Action

     const blog_list = props.blogs.data.map( (blog, index) => {
        return <BlogListItemIndex key={index} blog={blog} role={props.auth.user.role}/>
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
                                
                                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog List</h2>

                                    <div className="p-2 mt-4 mb-4">
                                        <Link
                                            tabIndex="1"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-green-500 rounded"
                                            style={{textDecoration: 'none'}}
                                            href={route("blog.create")}
                                        >
                                             Create Blog
                                        </Link>

                                        <Link
                                            tabIndex="1"
                                            className="mx-1 px-4 py-2 text-sm text-white bg-orange-500 rounded"
                                            style={{textDecoration: 'none'}}
                                            href={route("home.index")}
                                        >
                                             Blog Home Preview
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
                                {blog_list}
                                <Pagination class="mt-6" links={props.blogs.links} />
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
