declare namespace API {
  type DeploymentWithContainers = {
    deploymentName: string;
    containers: { [key: string]: string };
  };
}
