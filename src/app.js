App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 0,
  tokensSold: 0,
  tokensAvailable: 0,
  gasLimit: 0,
  gasPrice: 0,

  init: (config, serverUrl) => {
    App.tokenPrice = config.token_price;
    App.tokensAvailable = config.token_circulating_supply;
    App.gasLimit = config.gas_limit;
    App.gasPrice = config.gas_price;

    console.info('App initialized...');
    return App.initWeb3(serverUrl);
  },

  initWeb3: (serverUrl) => {
    // If a web3 instance is already provided by Meta Mask.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
      window.ethereum.enable();

    // Specify default instance if no web3 instance provided
    } else {
      App.web3Provider = new Web3.providers.HttpProvider();
      web3 = new Web3(App.web3Provider);
    }

    console.info('App web3 provider initialized...');
    return App.initContracts();
  },

  initContracts: () => {
    $.getJSON('ICOTokenSale.json', (icoTokenSale) => {
      App.contracts.ICOTokenSale = TruffleContract(icoTokenSale);
      App.contracts.ICOTokenSale.setProvider(App.web3Provider);
      App.contracts.ICOTokenSale.deployed().then((icoTokenSale) => {
        console.log('ICO Token Sale Address = ', icoTokenSale.address);
      });

    }).done(() => {
      $.getJSON('ICOToken.json', (icoToken) => {
        App.contracts.ICOToken = TruffleContract(icoToken);
        App.contracts.ICOToken.setProvider(App.web3Provider);
        App.contracts.ICOToken.deployed().then((icoToken) => {
          console.log('ICO Token Address = ', icoToken.address);
        });

        return App.render();
      });
    })
  },

  render: function() {
    if (App.loading) return;

    App.loading = true;

    let $loader  = $('#loader');
    let $content = $('#content');

    $loader.show();
    $content.hide();

    // Load account data
    web3.eth.getCoinbase((err, account) => {
      if(err === null) {
        console.info('Retrieved Account ID = ', account);
        App.account = account;
        $('#accountAddress').html('Your Account: ' + account);
      }
    });

    // Load token sale contract
    App.contracts.ICOTokenSale.deployed().then((instance) => {
      icoTokenSaleInstance = instance;

      return icoTokenSaleInstance.tokenPrice();

    }).then((tokenPrice) => {
      App.tokenPrice = tokenPrice;

      $('.token-price').html(web3.utils.fromWei(App.tokenPrice, 'ether'));

      return icoTokenSaleInstance.tokensSold();

    }).then((tokensSold) => {
      App.tokensSold = tokensSold.toNumber();

      $('.tokens-sold').html(App.tokensSold);
      $('.tokens-available').html(App.tokensAvailable);

      var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      $('#progress').css('width', progressPercent + '%');

      // Load token contract
      App.contracts.ICOToken.deployed().then((instance) => {
        icoTokenInstance = instance;
        console.info(instance, App);
        return icoTokenInstance.balanceOf(App.account);

      }).then((balance) => {
        $('.ico-balance').html(balance.toNumber());

        App.loading = false;

        $loader.hide();
        $content.show();
      })
    });
  },

  buyTokens: () => {
    $('#content').hide();
    $('#loader').show();
    $('#error p').html('');

    let numberOfTokens = parseInt($('#numberOfTokens').val(), 10);

    App.contracts.ICOTokenSale.deployed().then((instance) => {
      let purchaseInfo = {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
        gas: App.gasLimit,
        gasPrice: parseInt(web3.utils.toWei(App.gasPrice.toString(), 'gwei'), 10)
      };

      console.info('Making a purchase of ' + numberOfTokens + ' $ICO with: ', purchaseInfo);

      return instance.buyTokens(numberOfTokens, purchaseInfo);

    }).then((result) => {
      console.log('Tokens bought...')

      $('form').trigger('reset') // reset number of tokens in form
      App.render()

    // Wait for Sell event
    }).catch((err) => {
      console.error('Failed purchasing tokens: ', err);

      $('#content').show();
      $('#loader').hide();
      $('#error p').html(err.message);
    })
  }
}

$(function() {
  $(window).on('load', () => {
    $.getJSON('config.json', (config) => App.init(config, 'http://127.0.0.1:8545'));
  });
});
