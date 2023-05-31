/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
console.log("hello")


const { Contract } = require('fabric-contract-api');

class BirthCert extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

   

    async createBirthCert(ctx, appID, id, name, father_name, mother_name, dob, gender, weight, country, state, city, hospital_name, permanent_address,parents_permanent_address_during_birth,birth_place) {
        try {
            // var hash = sha256(new Date());
            const d = new Date();
            let text =d.toLocaleString();
            var birthCert = {
                appID,
                name,
                father_name,
                mother_name,
                docType: 'birthCert',
                dob,
                gender,
                weight,
                country,
                state,
                city,
                hospital_name,
                permanent_address,
                parents_permanent_address_during_birth,
                birth_place,
                createdat: text

            };
            
            
            await ctx.stub.putState(id, Buffer.from(JSON.stringify(birthCert)));
            } catch (error) {
                console.log("error", error);   
            }
    }

    async allList(ctx) {

        try {
            let queryString = {};
            queryString.selector = {
                docType: 'birthCert'
             
            };
            let iterator =  await ctx.stub.getQueryResult(JSON.stringify(queryString));
            let data = await this.filterQueryData(iterator);
            
            return JSON.parse(data);
        } catch (error) {
            console.log("error", error);
        }

    }

    async getBirthCertsByDate(ctx, startDate, endDate) {
        try {
            const queryString = {
                selector: {
                    docType: 'birthCert',
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            };

            const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
            const data = await this.filterQueryData(iterator);

            return JSON.parse(data);
        } catch (error) {
            console.log("error", error);
        }
    }
   
    async filterQueryData(iterator){
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async getBirthCert(ctx, appID, id) {
        const birthCertAsBytes = await ctx.stub.getState(id);
        if (!birthCertAsBytes || birthCertAsBytes.length === 0) {
            throw new Error(`Birth certificate with ID: ${id} does not exist`);
        }
    
        const birthCert = JSON.parse(birthCertAsBytes.toString());
        if (birthCert.appID !== appID) {
            throw new Error(`Birth certificate with ID: ${id} does not belong to appID: ${appID}`);
        }
    
        return birthCertAsBytes.toString();
    }
}
module.exports = BirthCert;