type ConfigOptions = {
    limit: number;
    limitSmall?: number;
    ellipse: boolean;
};

type Config = {
    [key: string]: ConfigOptions;
};

export const cutTextFunction = (text: string, title: string, isSmallScreen?: boolean) => {
    const config: Config = {
      block: {
        limit: 10,
        ellipse: false,
      },
      navigation: {
        limit: 35, 
        ellipse: true,
      },
      delete: {
        limitSmall: 10,
        limit: 20,
        ellipse: true,
      },
      information: {
        limitSmall: 10,
        limit: 23,
        ellipse: true,
      },
      groups: {
        limit: 18,
        ellipse: true,
      },
    };
  
    const option = config[title];
  
    if (!option) {
      return text; 
    }
  
    let modifiedText: string;
  
    if (isSmallScreen && option.limitSmall) {
      modifiedText = text.substring(0, option.limitSmall);
    } else if (option.limit) {
      modifiedText = text.substring(0, option.limit);
    } else {
      modifiedText = text;
    }
  
    if (option.ellipse && modifiedText !== text) {
      modifiedText += "...";
    }
    
    return modifiedText;
  }
