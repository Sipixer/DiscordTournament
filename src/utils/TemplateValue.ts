export function replaceTemplateValues(template: string, data: any) {
  return template.replace(/%([\w.]+)%/g, (match: any, key: string) => {
    let value = data;
    for (let subKey of key.split(".")) {
      value = value[subKey];
    }
    return value !== undefined ? value : match;
  });
}
