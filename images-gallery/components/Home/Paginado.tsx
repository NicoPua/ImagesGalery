const Paginado = ({ currentPage, setCurrentPage, imgsXPag, totalCantImgs } : any) => {
    
    let pags = [];
    for (let i = 1; i <= Math.ceil(totalCantImgs/imgsXPag); i++) {
        pags.push(i);        
    }

    return (
        <div className="flex justify-around w-1/2 mb-5">
            {pags.map((page: number,index : number) =>{
                return (
                    <button key={index} onClick={()=> setCurrentPage(page)} className={`${page === currentPage? "bg-gray-600 text-white" : "bg-gray-200 text-black"} rounded-xl p-3 shadow`}>
                        {page}
                    </button>
                )   
            })}
        </div>
    )
}

export default Paginado;