/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class DeathCert extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }


    async createDeathCert(ctx, appID, id, name, father_name, mother_name, age, dob, dod ,gender, country, state, city, address) {
        try {
            // var hash = sha256(new Date());
            const deathCert = {
                appID,
                name,
                father_name,
                mother_name,
                docType: 'deathCert',
                age,
                dob,
                dod,
                gender,
                country,
                state,
                city,
                address
            };

            await ctx.stub.putState(id, Buffer.from(JSON.stringify(deathCert)));
            } catch (error) {
                console.log("error", error);   
            }
    }


    async allList(ctx) {

        try {
            let queryString = {};
            queryString.selector = {
                docType: 'deathCert'
             
            };
            let iterator =  await ctx.stub.getQueryResult(JSON.stringify(queryString));
            let data = await this.filterQueryData(iterator);
            
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


    async getDeathCert(ctx, appID, id) {
        const deathCertAsBytes = await ctx.stub.getState(id);
        if (!deathCertAsBytes || deathCertAsBytes.length === 0) {
            throw new Error(`Death certificate with ID: ${id} does not exist`);
        }
    
        const deathCert = JSON.parse(deathCertAsBytes.toString());
        if (deathCert.appID !== appID) {
            throw new Error(`Death certificate with ID: ${id} does not belong to appID: ${appID}`);
        }
    
        return deathCertAsBytes.toString();
    }
    
}

module.exports = DeathCert;
