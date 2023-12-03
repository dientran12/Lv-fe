import React, { useEffect, useState } from 'react';
import CardItemSize from '~/components/CardComponent/CardItemSize';
import { MDBIcon } from 'mdb-react-ui-kit';
import * as VersionService from '~/services/VersionService'
import { useQuery } from '@tanstack/react-query';
import LoadingHasChil from '../LoadingComponent/LoadingHasChil';


const AddSizeComponent = ({ versionId }) => {
    const [listSizeOfVersion, setListSizeOfVersion] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGetDetailsVersion = async (id) => {
        const res = await VersionService.getDetailVersion(id)
        return res
    };
    const queryVersion = useQuery({ queryKey: ['version'], queryFn: () => fetchGetDetailsVersion(versionId) })
    const { isLoading: isLoadingProduct, data: version } = queryVersion

    useEffect(() => {
        setListSizeOfVersion(version?.sizes);
    }, [version]);

    console.log('version?.sizes', version?.sizes)

    const handleNewCardItem = () => {
        setListSizeOfVersion((prevList) => {
            const newItem = { sizeName: '', quantity: 1, versionId: versionId };
            const newList = [...prevList, newItem];
            return newList;
        })
    };

    return (
        <>
            <LoadingHasChil isLoading={isLoading}>
                {listSizeOfVersion?.map((size, index) => (
                    <CardItemSize
                        key={index}
                        dataItem={size}
                        queryVersion={queryVersion}
                        listSizeOfVersion={listSizeOfVersion}
                        setIsLoading={setIsLoading}
                    />
                ))}
                <div className="p-1 bg-hover-green text-center" style={{ backgroundColor: '#ffd021', borderRadius: '5px', color: '#fff', fontSize: '14px', cursor: 'pointer' }} onClick={handleNewCardItem} ><MDBIcon fas icon="plus-square" /> Add new</div>
            </LoadingHasChil>
        </>
    );
};

export default AddSizeComponent;
