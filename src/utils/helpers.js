export const MAX_DATA_ROWS = 1000000000;
export const DATA_SERVICE_LOCATOR = 80.7;
export const AUTOSAVE_HIDE_DURATION = 500;

export function createPathFromArray(pathArray) {
  return ['', ...pathArray].join('/');
}

export const COST_SHARE_TYPES = ['Client Cost', 'Client Share', 'Neigh Cost', 'Neigh Share', 'Shared Cost', 'Not Required', 'Included'];
export const COST_SHARE_DEFAULT_TYPE = 'Shared Cost';

export const EXTRA_LABOUR_TYPES = ['PLINTHLINE', 'CONCRETE', 'CONSTRUCTION', 'CONSTRUCTION', 'CONSTRUCTION'];
export const DEMO_REMOVAL_TYPES = ['DEMOLISH_REMOVE', 'CLEARING'];
export const EXTRA_LABOUR_DEMO_REMOVAL_TYPES = [...EXTRA_LABOUR_TYPES, ...DEMO_REMOVAL_TYPES];

export function getCostShareTypes(neighbours) {
  const costShare = [...COST_SHARE_TYPES];
  const neighbourCostShare = [];
  for (let i = 0; i < neighbours; i++) {
    neighbourCostShare.push(['Neigh', i + 1, 'Cost'].join(' '));
    neighbourCostShare.push(['Neigh', i + 1, 'Share'].join(' '));
  }

  costShare.splice(2, 0, ...neighbourCostShare);
  return costShare.map((c) => {
    return {
      Key: c,
      Value: c
    };
  });
}

export function formatDate(unixtimestamp) {
  if (unixtimestamp < 10000000000) {
    unixtimestamp = unixtimestamp * 1000;
  }

  const dt = new Date(unixtimestamp);
  return [dt.getDate().toString().padStart(2, '0'), (dt.getMonth() + 1).toString().padStart(2, '0'), dt.getFullYear()].join('/');
}

// program to check if a number is a float or integer value

export function checkNumber(x) {
  let regexPattern = /^-?[0-9]+$/;
  // check if the passed number is integer or float
  let result = regexPattern.test(x);

  if (result) {
    return 'integer';
  } else {
    return 'float';
  }
}
export function uploadFileToS3(uploadUrl, presignedFields, file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(presignedFields).forEach((key) => {
      formData.append(key, presignedFields[key]);
    });

    formData.append('file', file); // Actual file has to be appended last.

    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl, true);
    xhr.send(formData);
    xhr.onload = function () {
      this.status === 204 ? resolve() : reject(this.responseText);
    };
  }).catch((error) => console.log(error.message));
}
