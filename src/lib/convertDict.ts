export interface trainingTypesDictType {
  freeWeight: string;
  machine: string;
  ownWeight: string;
}

export const trainingTypesDict: trainingTypesDictType = {
  freeWeight: "フリーウエイト",
  machine: "マシン",
  ownWeight: "自重",
};

export interface partsDetailsDictType {
  trapeziusUpper: string;
  deltoidFront: string;
  deltoidMiddle: string;
  deltoidRear: string;
  greaterPectoralsUpper: string;
  greaterPectoralsMiddle: string;
  greaterPectoralsLower: string;
  trapeziusMiddle: string;
  latissimusDorsiUpper: string;
  latissimusDorsiLower: string;
  erectorSpinae: string;
  biceps: string;
  triceps: string;
  rectusAbs: string;
  obliquesAbs: string;
  gluteusMaximus: string;
  gluteusMedius: string;
  hamstring: string;
  quadriceps: string;
  soleus: string;
}

export const partsDetailsDict = {
  trapeziusUpper: "僧帽筋上部",
  deltoidFront: "三角筋前部",
  deltoidMiddle: "三角筋中部",
  deltoidRear: "三角筋後部",
  greaterPectoralsUpper: "大胸筋上部",
  greaterPectoralsMiddle: "大胸筋中部",
  greaterPectoralsLower: "大胸筋下部",
  trapeziusMiddle: "僧帽筋中下部",
  latissimusDorsiUpper: "広背筋上部",
  latissimusDorsiLower: "広背筋下部",
  erectorSpinae: "脊柱起立筋",
  biceps: "上腕二頭筋",
  triceps: "上腕三頭筋",
  rectusAbs: "腹直筋",
  obliquesAbs: "腹斜筋",
  gluteusMaximus: "大臀筋",
  gluteusMedius: "中臀筋",
  hamstring: "大腿二頭筋(ハムストリングス)",
  quadriceps: "大腿四頭筋",
  soleus: "ヒラメ筋",
};
