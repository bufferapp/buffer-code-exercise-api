const deployments = [
  'reverse-proxy',
  'marketing-site',
  'api',
  'web-app',
  'worker',
  'image-processor',
  'authentication',
  'billing',
  'session',
]
const failureStates = {
  Unauthenticated: 'Unauthenticated',
  NoPods: 'NoPods',
  CrashLoopBackOff: 'CrashLoopBackOff',
  ImagePullBackOff: 'ImagePullBackOff',
}
module.exports.failureStates = failureStates

const generateRandomString = (length = 5, range = 36) =>
  Math.random().toString(range).substring(2, length + 2)

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomValue = (values) => values[getRandomNumber(0, values.length)]

const getRandomFailureState = () => getRandomValue(Object.values(failureStates))
module.exports.getRandomFailureState = getRandomFailureState

const generateRandomFailure = (failureState, podInfo) => {
  const age = getRandomNumber(3, 15)
  switch (failureState) {
    case failureStates.CrashLoopBackOff:
      return {
        ...podInfo,
        status: 'CrashLoopBackOff',
        restarts: getRandomNumber(50, 75),
        containersReady: [false],
        age,
      }
    case failureStates.ImagePullBackOff:
      return {
        ...podInfo,
        status: 'ImagePullBackOff',
        containersReady: [false],
        restarts: 0,
        age,
      }
    default:
      return podInfo
  }
}

const generatePodInfo = (failureState, podName, age) => {
  const info = {
    name: podName,
    status: 'RUNNING',
    restarts: getRandomNumber(0, 2),
    containersReady: [true],
    age,
  }
  if (podName.match(/^api/)) {
    return generateRandomFailure(failureState, info)
  }
  return info
}

const generatePods = (failureState, deploymentName) => {
  const age = getRandomNumber(20, 1000)
  return [...Array(getRandomNumber(3, 10))]
    .map(() => `${deploymentName}-${generateRandomString(5)}`)
    .map((podName) => generatePodInfo(failureState, podName, age))
}

module.exports.getClusterPods = function(failureState) {
  // If failure state is NoPods, remove all API pods from the list as if the deployment was accidentally deleted
  const deploymentVersions = deployments
    .filter(name => failureState === failureStates.NoPods ? (name !== 'api') : true)
    .map(name => `${name}-${generateRandomString(9)}`)
  const podGroups = deploymentVersions.map(generatePods.bind(null, failureState))
  return podGroups.flat()
}
