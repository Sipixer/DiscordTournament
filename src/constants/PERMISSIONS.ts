interface Permission {
  team: {
    delete?: boolean;
    change?: boolean;
    member?: {
      add?: boolean;
      remove?: boolean;
    };
    tournament?: {
      join?: boolean;
      leave?: boolean;
    };
  };
}
export const PERMISSIONS: { [key: string]: Permission } = {
  Capitain: {
    team: {
      delete: true,
      change: true,
      member: {
        add: true,
        remove: true,
      },
      tournament: {
        join: true,
        leave: true,
      },
    },
  },
  Manager: {
    team: {
      delete: false,
      change: true,
      member: {
        add: true,
        remove: true,
      },
      tournament: {
        join: true,
        leave: true,
      },
    },
  },
  Player: {
    team: {
      delete: false,
      change: false,
      member: {
        add: false,
        remove: false,
      },
      tournament: {
        join: false,
        leave: false,
      },
    },
  },
  Sub: {
    team: {
      delete: false,
      change: false,
      member: {
        add: false,
        remove: false,
      },
      tournament: {
        join: false,
        leave: false,
      },
    },
  },
};
