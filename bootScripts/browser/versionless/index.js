const {getCookie, setCookie} = require("../util/cookies.js");
const opendsu = require("opendsu");
const keyssi = opendsu.loadApi("keyssi");
const resolver = opendsu.loadApi("resolver");

const cookieName = "MAIN-DSU-VALUE";
let walletSSI = getCookie(cookieName);

if(!walletSSI){
    const path = `/dsu-explorer`;
    resolver.createVersionlessDSU(path, (err, wallet)=>{
        if(err){
            alert(`Not able to create Wallet using the VersionLess DSU. ${err.message}`);
            return;
        }
        wallet.getKeySSIAsString((err, ssi)=>{
            if(err){
                alert(`Not able to retrieve Wallet SSI. ${err.message}`);
                return;
            }
            console.log("Wallet initialised. Refreshing...");
            rawDossier = wallet;
            setCookie(cookieName, ssi);
            location.reload();
        });
    });
}else{
    resolver.loadDSU(walletSSI, (err, wallet)=>{
        rawDossier = wallet;
    })
}