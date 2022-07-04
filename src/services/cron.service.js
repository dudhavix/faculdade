const cron = require("node-cron");
const googlefitService = require("./googlefit.service");

cron.schedule("* * * * *", () => {
    //console.log(req.user);
    //googlefitService.getSteps()
    console.log("Executando a tarefa a cada 2 minuto");
});

// ya29.A0ARrdaM80KGhtzn_k6i7ll77SdNUSuZdTpK61NVzpu2ZZICK3FsJgXp3IHbpPilR6sdQWGCDcgrUb6Wk_AXflsTtgwV9bHJeS2jV7Xs9i90J78qU-8YazvcjHHkmrYGtXkY9Oan4p_ZxflcbqUoptFtRgKi7VYUNnWUtBVEFTQVRBU0ZRRl91NjFWTFp0cXk4S2VReTBFaGl0YWNUdFJ2UQ0163
// ya29.a0ARrdaM_Ic0amYodrQbsMZl5pvPFRWhuSeVSzEQY-3rZojAs0T9nwa894kRPPfsGI_p6CQROQvPA7RHyknwJqFbY3m-esEzzWJx7gea2bKWAHvKNNajc_Rx4R4BdLxKx1kqzzyQ2mCiVUDiEos-pNEuRs9fr4