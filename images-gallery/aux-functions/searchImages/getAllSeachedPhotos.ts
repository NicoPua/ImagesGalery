import axios from "axios";
import cleanAllSearchedDataPhotos from "./cleanAllSearchedDataPhotos";

const { UNSPLASH_ACCESS_KEY } = process.env;

const getAllSearchedPhotos = async (imgToSearch : any) => {
    const firstPage = (await axios.get(`https://api.unsplash.com/search/photos?query=${imgToSearch}&per_page=15&page=1&client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    const secondPage = (await axios.get(`https://api.unsplash.com/search/photos?query=${imgToSearch}&per_page=15&page=2&client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    const thirdPage = (await axios.get(`https://api.unsplash.com/search/photos?query=${imgToSearch}&per_page=15&page=3&client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    const fourthPage = (await axios.get(`https://api.unsplash.com/search/photos?query=${imgToSearch}&per_page=15&page=4&client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    const fifthPage = (await axios.get(`https://api.unsplash.com/search/photos?query=${imgToSearch}&per_page=15&page=5&client_id=${UNSPLASH_ACCESS_KEY}`)).data;
    

    const cleanedFirstPageData : any = await cleanAllSearchedDataPhotos([...firstPage.results]);
    const cleanedSecondPageData : any = await cleanAllSearchedDataPhotos([...secondPage.results]);
    const cleanedThirdPageData : any = await cleanAllSearchedDataPhotos([...thirdPage.results]);
    const cleanedFourthPageData : any = await cleanAllSearchedDataPhotos([...fourthPage.results]);
    const cleanedFifthPageData : any = await cleanAllSearchedDataPhotos([...fifthPage.results]);

    const allCleanedPhotos = [ ...cleanedFirstPageData, ...cleanedSecondPageData, ...cleanedThirdPageData, ...cleanedFourthPageData, ...cleanedFifthPageData ]

    return allCleanedPhotos;
}

export default getAllSearchedPhotos;